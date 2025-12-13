"use client";
import { Button } from "@/components/ui/button";
import { Check, Loader2, PlusCircle, Sparkle } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { API_URL } from "@/utils/api";

const EntryForm = ({ type, fields, onSave }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isImproving, setisImproving] = useState(false);
  const [isAdded, setisAdded] = useState(false);

  const initialForm = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const handleImporvingDescription = async () => {
    if (!formData.description) {
      return toast.error("Description can not be empty");
    }

    setisImproving(true);
    try {
      const res = await fetch(`${API_URL}/api/user/improve-desc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc: formData.description }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({ ...formData, description: data.improvedDesc });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisImproving(false);
    }
  };

  const handleSubmit = () => {
    let newErrors = {};

    // Auto-validate using the fields definition
    fields.forEach((field) => {
      if (!formData[field.name] || formData[field.name].trim() === "") {
        newErrors[field.name] = `Please enter ${field.label}.`;
      }
    });

    // If errors → stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors
    setErrors({});

    // Send data to parent component
    if (onSave) onSave(formData);

    // Reset form dynamically based on fields
    const resetForm = fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
    setFormData(resetForm);

    setIsAdding(false);
    setisAdded(true);
  };

  return (
    <div>
      {isAdding && (
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Add {type}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {fields.map((field, i) => (
              <div key={i}>
                {field.type === "textarea" ? (
                  <Textarea
                    className="h-28"
                    placeholder={field.label}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.label}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                )}

                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex justify-between gap-3 text-muted-foreground">
            <Button
              variant="ghost"
              type="button"
              size={"sm"}
              disabled={isImproving}
              onClick={handleImporvingDescription}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkle className="h-4 w-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>

            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>

              <Button type="button" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added {type}
            </>
          ) : (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add {type}
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default EntryForm;
