"use client";

import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    color: "#333",
    fontSize: 11,
  },

  header: {
    textAlign: "center",
    marginBottom: 25,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
  },
  role: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },

  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 13,
    fontWeight: 700,
    color: "#2b59c3",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  pill: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  timelineItem: {
    borderLeftWidth: 2,
    borderLeftColor: "#ccc",
    paddingLeft: 8,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#000",
  },
  itemCompany: {
    fontSize: 11,
    color: "#2b59c3",
    fontWeight: 700,
  },
  itemDates: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 10,
    lineHeight: 1.4,
  },
});

export default function ResumePDF({ Form }) {
  const generatePDF = async () => {
    const blob = await pdf(
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{Form.fullName || "Your Name"}</Text>
            <Text style={styles.role}>{Form.role || "Professional Title"}</Text>
          </View>

          {/* Contact */}
          {(Form.email ||
            Form.number ||
            Form.linkedInURl ||
            Form.twitterURl) && (
            <View style={styles.section}>
              <Text style={styles.heading}>Contact Information</Text>
              {Form.email && <Text>Email: {Form.email}</Text>}
              {Form.number && <Text>Phone: {Form.number}</Text>}
              {Form.linkedInURl && <Text>LinkedIn: {Form.linkedInURl}</Text>}
              {Form.twitterURl && <Text>Twitter: {Form.twitterURl}</Text>}
            </View>
          )}

          {/* Summary */}
          {Form.summary && (
            <View style={styles.section}>
              <Text style={styles.heading}>Professional Summary</Text>
              <Text>{Form.summary}</Text>
            </View>
          )}

          {/* Skills */}
          {Form.skills?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Skills</Text>
              <View style={styles.pillRow}>
                {Form.skills.map((s, i) => (
                  <Text key={i} style={styles.pill}>
                    {s}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Work Experience */}
          {Form.workExperiance?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Work Experience</Text>

              {(() => {
                const exp = Form.workExperiance.at(-1); // last item

                return (
                  <View style={styles.timelineItem}>
                    <Text style={styles.itemTitle}>{exp.title}</Text>
                    <Text style={styles.itemCompany}>{exp.company}</Text>
                    <Text style={styles.itemDates}>
                      {exp.startDate} → {exp.endDate}
                    </Text>
                    <Text style={styles.itemDescription}>
                      {exp.description}
                    </Text>
                  </View>
                );
              })()}
            </View>
          )}

          {/* Education */}
          {Form.education?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Education</Text>

              {(() => {
                const edu = Form.education.at(-1);

                return (
                  <View style={styles.timelineItem}>
                    <Text style={styles.itemTitle}>{edu.course}</Text>
                    <Text style={styles.itemCompany}>{edu.school}</Text>
                    <Text style={styles.itemDates}>
                      {edu.startDate} → {edu.endDate}
                    </Text>
                    <Text style={styles.itemDescription}>
                      {edu.description}
                    </Text>
                  </View>
                );
              })()}
            </View>
          )}

          {/* Projects */}
          {Form.projects?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Projects</Text>

              {(() => {
                const proj = Form.projects.at(-1);

                return (
                  <View style={styles.timelineItem}>
                    <Text style={styles.itemTitle}>{proj.title}</Text>
                    <Text style={styles.tech}>
                      {proj.description}
                    </Text>
                  </View>
                );
              })()}
            </View>
          )}
        </Page>
      </Document>
    ).toBlob();

    saveAs(blob, "resume.pdf");
  };

  return (
    <Button onClick={generatePDF} variant="outline">
      Download PDF
    </Button>
  );
}
