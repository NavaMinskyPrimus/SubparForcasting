"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Plus, Calendar, Edit2, Save, X } from "lucide-react";
import { CURRENT_DATE, CURRENT_YEAR } from "@/lib/constants";
import { setWindow } from "@/lib/settingsActions";
import { fromZonedTime } from "date-fns-tz";
import { addQuestion, deleteQuestion, editQuestion } from "@/lib/questionsActions";

type Question = {
  id: number;
  text: string;
};
export function AdminPage({ rows, isAdmin, nextGame, playing}: { rows: any[], isAdmin: boolean, nextGame : number, playing:boolean}) {
  const data: Question[] = rows.map(
  (val => ({id: val.questionid, text: val.text}))
  );

  const router = useRouter();
  const [question_data, setQuestionData] = useState<Question[]>(data);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  type SaveStatus = "idle" | "saving" | "success" | "error";
  const [dateSaveStatus, setDateSaveStatus] = useState<SaveStatus>("idle");
  const [dateSaveError, setSaveDateError] = useState<string | null>(null);
  const [newQStatus, setNewQStatus] = useState<SaveStatus>("idle");
  const [newQError, setNewQError] = useState<string | null>(null);
  const [editQStatus, setEditQStatus] = useState<SaveStatus>("idle");
  const [editQError, setEditQError] = useState<string | null>(null);
  const [deleteQStatus, setDeleteQStatus] = useState<SaveStatus>("idle");
  const [deleteQError, setDeleteQError] = useState<string | null>(null);


  const handleSaveDates = () => {
    if (!openDate || !closeDate) return;

    const TZ = "America/New_York";
    setDateSaveStatus("saving");
    setSaveDateError(null);

    startTransition(async () => {
      const openIso = fromZonedTime(`${openDate} 00:00:00`, TZ).toISOString();
      const closeIso = fromZonedTime(`${closeDate} 00:00:00`, TZ).toISOString();

      const res = await setWindow({ open: openIso, close: closeIso });
      if (!res.ok) {
        setDateSaveStatus("error");
        setSaveDateError(res.error ?? "Unknown error");
        return;
      }
      setDateSaveStatus("success");
      setTimeout(() => setSaveDateError("idle"), 1000);
    });
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setNewQStatus("saving");
      startTransition(async () => {
        const res = await addQuestion(newQuestion);
        if (!res.ok) {
          setNewQStatus("error");
          setNewQError(res.error ?? "Unknown error");
          return;
        }
        const qid = res.data.questionid;
        setQuestionData((prev) => [...prev, {id: qid, text : newQuestion.trim()}]);
        setNewQuestion("");
        setNewQStatus("success");
        setTimeout(() => setNewQStatus("idle"), 1000);
      })
    }
  };

  const handleDeleteQuestion = (index: number) => {
    setDeleteQStatus("saving");
    startTransition(async () => {
      const data = question_data[index];
      const qid = data.id
      const res = await deleteQuestion(qid)
      if(! res.ok){
        setDeleteQStatus("error")
        setDeleteQError(res.error)
        return;
      }
      setQuestionData((prev) => prev.filter((_, i) => i !== index));
      setDeleteQStatus("success");
      setTimeout(() => setDeleteQStatus("idle"), 1000);

    })
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleEditQuestion = (index: number) => {
    setEditingIndex(index);
    setEditingText(question_data[index].text ?? "");
  };

  const handleSaveEdit = () => {
    if (editingText.trim() && editingIndex !== null) {
      setEditQStatus("saving");
      startTransition(async () => {
        const data = question_data[editingIndex];
        const res = await editQuestion(data.id, editingText.trim());
        if(!res.ok){
          setEditQStatus("error")
          setEditQError(res.error)
          return;
        }
        const newQuestion = {id: data.id, text:editingText.trim()}
        setQuestionData((prev) =>
          prev.map((q, i) => (i === editingIndex ? newQuestion : q))
        );
        setTimeout(() => setEditQStatus("idle"), 1000);
      })
      setEditQStatus("success");
      setTimeout(() => setDeleteQStatus("idle"), 1000);
    }
    setEditingIndex(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#228B22] via-blue-600 to-purple-600">
      <Header isAdmin={isAdmin} playing={playing}/>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-white/90">
            Manage questions and settings for {nextGame}
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
              <Button
                onClick={handleSaveDates}
                disabled={!openDate || !closeDate || dateSaveStatus === "saving"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {dateSaveStatus === "saving" ? "Saving..." : "Save Opening Period"}
              </Button>

              {dateSaveStatus === "success" && (
                <p className="text-sm text-green-700 mt-2">
                  Opening period saved successfully.
                </p>
              )}
              {dateSaveStatus === "error" && (
                <p className="text-sm text-red-700 mt-2">
                  Failed to save opening period: {dateSaveError}
                </p>
              )}
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
                      placeholder="By adding a question, I hereby acknowledge Nava's status as the most best-est Minsky-Primus"
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

                  {newQStatus === "success" && (
                    <p className="text-sm text-green-700 mt-2">
                      Question added successfully.
                    </p>
                  )}
                  {newQStatus === "error" && (
                    <p className="text-sm text-red-700 mt-2">
                      Failed to add question: {newQError}
                    </p>
                  )}
                </>
              )}

              {/* Display Added Questions */}
              {question_data.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Questions ({question_data.length})
                  </h3>
                  <div className="space-y-2">
                    {question_data.map((q, index) => (
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
                         <p className="text-sm text-gray-800 flex-1 whitespace-pre-wrap">
                            {q.text}
                          </p>
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
                {editQStatus === "success" && (
                    <p className="text-sm text-green-700 mt-2">
                      Question edited successfully
                    </p>
                  )}
                  {editQStatus === "error" && (
                    <p className="text-sm text-red-700 mt-2">
                      Failed to edit question: {newQError}
                    </p>
                  )}
                  {deleteQStatus === "success" && (
                    <p className="text-sm text-green-700 mt-2">
                      Question deleted successfully
                    </p>
                  )}
                  {deleteQStatus === "error" && (
                    <p className="text-sm text-red-700 mt-2">
                      Failed to delete question: {newQError}
                    </p>
                  )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

