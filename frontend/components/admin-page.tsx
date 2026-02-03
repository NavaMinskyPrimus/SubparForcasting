"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Plus, Calendar, Edit2, Save, X } from "lucide-react";
import { CURRENT_YEAR } from "@/lib/constants";

// Mock questions for 2027
const INITIAL_QUESTIONS_2027 = [
  "Will the global average temperature increase by more than 0.2°C?",
  "Will a major AI company announce AGI capabilities?",
  "Will Bitcoin exceed $100,000?",
  "Will there be a crewed mission to Mars?",
  "Will a new pandemic emerge?",
  "Will electric vehicles make up more than 30% of new car sales globally?",
  "Will a major tech company have a CEO change?",
  "Will the S&P 500 be higher than at the start of the year?",
];

export function AdminPage() {
  const router = useRouter();

  const [questions, setQuestions] = useState<string[]>(INITIAL_QUESTIONS_2027);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions((prev) => [...prev, newQuestion.trim()]);
      setNewQuestion("");
      // TODO: Send to backend when wired up
    }
  };

  const handleSaveDates = () => {
    if (openDate && closeDate) {
      // TODO: Send to backend when wired up
      alert(`Questions will be open from ${openDate} to ${closeDate}`);
    }
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleEditQuestion = (index: number) => {
    setEditingIndex(index);
    setEditingText(questions[index] ?? "");
  };

  const handleSaveEdit = () => {
    if (editingText.trim() && editingIndex !== null) {
      setQuestions((prev) =>
        prev.map((q, i) => (i === editingIndex ? editingText.trim() : q))
      );
      setEditingIndex(null);
      setEditingText("");
      // TODO: Send to backend when wired up
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#228B22] via-blue-600 to-purple-600">
      <Header isAdmin={true} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-white/90">
            Manage questions and settings for {CURRENT_YEAR + 1}
          </p>
        </div>

        <div className="space-y-6">
          {/* Set Opening Dates Section */}
          <Card className="bg-white/95 backdrop-blur shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Question Opening Period
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Set the date range when users can submit their predictions
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="openDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Opening Date
                  </label>
                  <input
                    type="date"
                    id="openDate"
                    value={openDate}
                    onChange={(e) => setOpenDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="closeDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Closing Date
                  </label>
                  <input
                    type="date"
                    id="closeDate"
                    value={closeDate}
                    onChange={(e) => setCloseDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>

              {openDate && closeDate && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Questions will be open from{" "}
                    <strong>
                      {new Date(openDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </strong>{" "}
                    to{" "}
                    <strong>
                      {new Date(closeDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </strong>
                  </p>
                </div>
              )}

              <Button
                onClick={handleSaveDates}
                disabled={!openDate || !closeDate}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Save Opening Period
              </Button>
            </CardContent>
          </Card>

          {/* Add Question Section */}
          <Card className="bg-white/95 backdrop-blur shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#228B22]" />
                Add New Question
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {(
                <>
                  <div>
                    <label
                      htmlFor="question"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Question Text
                    </label>
                    <textarea
                      id="question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Will the average temperature in New York exceed 75°F in July?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleAddQuestion}
                    className="bg-gradient-to-r from-[#228B22] to-blue-600 hover:from-[#1a6b1a] hover:to-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </>
              )}

              {/* Display Added Questions */}
              {questions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Added Questions ({questions.length})
                  </h3>

                  <div className="space-y-2">
                    {questions.map((q, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        {editingIndex === index ? (
                          <div className="flex-1">
                            <textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22] focus:border-transparent resize-none"
                              rows={3}
                            />
                          </div>
                        ) : (
                          <p className="text-sm text-gray-800 flex-1">{q}</p>
                        )}

                        <div className="shrink-0 flex items-center gap-2">
                          {editingIndex === index ? (
                            <>
                              <Button
                                onClick={handleSaveEdit}
                                className="bg-[#228B22] hover:bg-[#1a6b1a] text-white"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </Button>
                              <Button
                                onClick={handleCancelEdit}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditQuestion(index)}
                                className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteQuestion(index)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
