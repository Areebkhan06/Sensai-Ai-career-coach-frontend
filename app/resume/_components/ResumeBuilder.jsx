"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Edit, Loader2, Monitor, Save } from "lucide-react";
import React, { useRef, useState } from "react";
import EntryForm from "./EntryForm";
import { FORM_FIELDS } from "@/data/formsData";
import ResumePreview from "./ResumePreview";
import ResumePDF from "./ResumePDF";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { API_URL } from "@/utils/api";

const ResumeBuilder = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [activeTab, setactiveTab] = useState("edit");
  const [resumeMode, setresumeMode] = useState("preview");
  const [Form, setForm] = useState({
    email: "",
    number: "",
    linkedInURl: "",
    skills: [],
    summary: "",
    twitterURl: "",
    workExperiance: [],
    education: [],
    projects: [],
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn || !isLoaded) return;

    let newErrors = {};

    // VALIDATION
    if (!Form.email) newErrors.email = "Please enter your email";
    if (!Form.number) newErrors.number = "Please enter your mobile number";
    if (!Form.linkedInURl)
      newErrors.linkedInURl = "Please enter your LinkedIn URL";
    if (!Form.summary)
      newErrors.summary = "Please enter your Professional Summary";
    if (Form.skills.length === 0)
      newErrors.skills = "Please enter your Top Skills";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // CLEAR ERRORS

    try {
      const res = await fetch(`${API_URL}/api/user/save-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId: user.id, Form }),
      });

      const data = await res.json(); // ✅ FIXED

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="gradient-title font-bold text-5xl md:text-6xl">
          Resume Builder
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setactiveTab} className={"px-3"}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <h1 className="mb-3 text-2xl">Contact Information</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="w-full bg-accent-foreground/5 p-3 md:p-0 mb-3 rounded-lg">
              {/* Row 1 */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch p-2 md:p-5 rounded-lg">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="border border-muted w-full px-2 py-1"
                    value={Form.email}
                    onChange={(e) =>
                      setForm({ ...Form, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="number">Mobile Number</label>
                  <input
                    type="number"
                    placeholder="+1 234 567 89"
                    className="border border-muted w-full px-2 py-1"
                    value={Form.number}
                    onChange={(e) =>
                      setForm({ ...Form, number: e.target.value })
                    }
                  />
                  {errors.number && (
                    <p className="text-red-500 text-sm">{errors.number}</p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col md:flex-row gap-4 items-stretch p-2 md:p-5 rounded-lg">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="LinkedIn">LinkedIn URL</label>
                  <input
                    type="text"
                    placeholder="http://linkedin.com/in/your-profile"
                    className="border border-muted w-full px-2 py-1"
                    value={Form.linkedInURl}
                    onChange={(e) =>
                      setForm({ ...Form, linkedInURl: e.target.value })
                    }
                  />
                  {errors.linkedInURl && (
                    <p className="text-red-500 text-sm">{errors.linkedInURl}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="number">Twitter/X Profile</label>
                  <input
                    type="text"
                    placeholder="http://twitter.com/in/your-profile"
                    className="border border-muted w-full px-2 py-1"
                    value={Form.twitterURl}
                    onChange={(e) =>
                      setForm({ ...Form, twitterURl: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="mb-3 text-2xl">Professional Summary</h1>
              <Textarea
                rows={5}
                className="w-full h-36 mb-2"
                placeholder="Write a compelling professional summary"
                value={Form.summary}
                onChange={(e) => setForm({ ...Form, summary: e.target.value })}
              ></Textarea>
              {errors.summary && (
                <p className="text-red-500 text-sm">{errors.summary}</p>
              )}
            </div>
            <div>
              <h1 className="mb-3 text-2xl">Skills</h1>
              <Textarea
                rows={5}
                className="w-full h-32 mb-2"
                placeholder="List your key Skills Ex html,css,js"
                value={Form.skills}
                onChange={(e) =>
                  setForm({
                    ...Form,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              ></Textarea>
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills}</p>
              )}
            </div>

            <div>
              <h1 className="mb-3 text-2xl">Work Experience</h1>
              <EntryForm
                type="Work Experience"
                fields={FORM_FIELDS.experience}
                onSave={(data) =>
                  setForm({
                    ...Form,
                    workExperiance: [...Form.workExperiance, data],
                  })
                }
              />
            </div>

            <div>
              <h1 className="mb-3 text-2xl">Education</h1>
              <EntryForm
                type="Education"
                fields={FORM_FIELDS.education}
                onSave={(data) =>
                  setForm({
                    ...Form,
                    education: [...Form.education, data],
                  })
                }
              />
            </div>

            <div>
              <h1 className="mb-3 text-2xl">Projects</h1>
              <EntryForm
                type="Project"
                fields={FORM_FIELDS.projects}
                onSave={(data) =>
                  setForm({
                    ...Form,
                    projects: [...Form.projects, data],
                  })
                }
              />
            </div>

            <Button className="mt-5" type="submit">
              Submit
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="preview">
          <Button
            variant="link"
            type="button"
            className="mb-2"
            onClick={() =>
              setresumeMode(resumeMode === "preview" ? "edit" : "preview")
            }
          >
            {resumeMode === "preview" ? (
              <>
                <Edit className="w-4 h-4" /> Edit Resume
              </>
            ) : (
              <>
                <Monitor className="w-4 h-4" /> Show Preview
              </>
            )}
          </Button>

          {resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}

          <div className="flex flex-col items-center gap-6">
            {/* Show ONLY if email or number exists */}
            {(Form.email.trim() !== "" || Form.number.trim() !== "") && (
              <>
                {/* Real-time Preview */}
                <ResumePreview Form={Form} />

                {/* Download PDF */}
                <ResumePDF Form={Form} />
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
