"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Plus, Calendar, Edit2, Save, X, Ban, CheckCircle, UserPlus } from "lucide-react";
import { CURRENT_DATE, CURRENT_YEAR } from "@/lib/constants";
import { setWindow } from "@/lib/settingsActions";
import { fromZonedTime } from "date-fns-tz";
import { addQuestion, deleteQuestion, editQuestion, invalidateQuestion, setResult, validateQuestion } from "@/lib/questionsActions";
import { computeResults } from "@/lib/resultsActions";
import { setReleasedYear as setReleasedYearAction } from "@/lib/settingsActions";
import { makeAdmin, makeUser } from "@/lib/userActions";

type Question = {
  id: number;
  text: string;
};

type LastYearQuestion = {
  id: number;
  text: string;
  result: boolean | null;
  isvalid: boolean;
};

type User = {
  email: string;
  name?: string;
  permission: string;
};

export function AdminPage({ rowsnext, rowslast, isAdmin, nextGame, playing, users, initialReleasedYear }: { rowsnext: any[], rowslast: any[], isAdmin: boolean, nextGame: number, playing: boolean, users: User[], initialReleasedYear: number }) {
  const data: Question[] = rowsnext.map(
  (val => ({id: val.questionid, text: val.text}))
  );

  const lastYearData: LastYearQuestion[] = rowslast.map(
    (val) => ({ id: val.questionid, text: val.text, result: val.result ?? null, isvalid: val.isvalid })
  );

  const router = useRouter();
  const [question_data, setQuestionData] = useState<Question[]>(data);
  const [lastYearQuestions, setLastYearQuestions] = useState<LastYearQuestion[]>(lastYearData);
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
  const [validUpdateStatus, setValidUpdateStatus] = useState<SaveStatus>("idle");
  const [validUpdateError, setValidUpdateError] =  useState<string | null>(null);
  const [resultUpdateStatus, setResultUpdateStatus] = useState<SaveStatus>("idle");
  const [resultUpdateError, setResultUpdateError] =   useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminEmailStatus, setAdminEmailStatus] =useState<SaveStatus>("idle");
  const [adminEmailError, setAdminEmailError] = useState<string | null>(null);

  const [userList, setUserList] = useState<User[]>(users);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [adminSelectedFromList, setAdminSelectedFromList] = useState(false);
  const [selectedUserPermission, setSelectedUserPermission] = useState<string | null>(null);
  const [computeStatus, setComputeStatus] = useState<SaveStatus>("idle");
  const [computeError, setComputeError] = useState<string | null>(null);
  const [releasedYear, setReleasedYear] = useState(initialReleasedYear);



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

  const handleInvalidateQuestion = (index: number) => {
    setValidUpdateStatus("saving")
    startTransition(async () =>{
      const data = lastYearQuestions[index];
      const qid = data.id
      const res = await invalidateQuestion(qid)
      if(!res.ok){
        setValidUpdateStatus("error")
        setValidUpdateError(res.error)
        return;
      }
      setLastYearQuestions((prev) =>
        prev.map((q, i) => i === index ? { ...q, isvalid: false } : q)
      );
    })
  };

  const handleRevalidateQuestion = (index: number) => {
    setValidUpdateStatus("saving")
    startTransition(async () =>{
      const data = lastYearQuestions[index];
      const qid = data.id
      const res = await validateQuestion(qid)
      if(!res.ok){
        setValidUpdateStatus("error")
        setValidUpdateError(res.error)
        return;
      }
      setLastYearQuestions((prev) =>
        prev.map((q, i) => i === index ? { ...q, isvalid: true } : q)
      );
    })
  };

  const filteredUsers = adminEmail.trim()
    ? userList.filter(u => u.email.toLowerCase().includes(adminEmail.toLowerCase()))
    : [];

  const handleAddAdmin = () => {
    if (adminEmail.trim()) {
      setAdminEmailStatus("saving");
      startTransition(async () => {
        const res = await makeAdmin(adminEmail);
        if (!res.ok) {
          setAdminEmailStatus("error");
          setAdminEmailError(res.error ?? "Unknown error");
          return;
        }
        setAdminEmailStatus("success");
        setAdminEmail("");
        setAdminSelectedFromList(false);
        setSelectedUserPermission(null);
        setTimeout(() => setAdminEmailStatus("idle"), 2000);
      });
    }
  };

  const handleRemoveAdmin = () => {
    if (adminEmail.trim()) {
      setAdminEmailStatus("saving");
      startTransition(async () => {
        const res = await makeUser(adminEmail);
        if (!res.ok) {
          setAdminEmailStatus("error");
          setAdminEmailError(res.error ?? "Unknown error");
          return;
        }
        setAdminEmailStatus("success");
        setAdminEmail("");
        setAdminSelectedFromList(false);
        setSelectedUserPermission(null);
        setTimeout(() => setAdminEmailStatus("idle"), 2000);
      });
    }
  };

  const handleSetResult = (index: number, result: boolean) => {
    setResultUpdateStatus("saving")
    startTransition(async () => {
      const data = lastYearQuestions[index];
      const qid = data.id
      const text = data.text
      const res = await setResult(qid, text, result)
      if(!res.ok){
        setResultUpdateStatus("error")
        setResultUpdateError(res.error)
        return
      }
      setLastYearQuestions((prev) =>
        prev.map((q, i) => i === index ? { ...q, result, isvalid: true } : q)
      );
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#228B22] via-blue-600 to-purple-600">
      <Header isAdmin={isAdmin} playing={playing}/>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-white/90">Manage questions and settings</p>
        </div>

        <div className="space-y-8">
          {/* ADD ADMIN SECTION */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Change User Status</h2>
            <Card className="bg-white/95 backdrop-blur shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  Grant or Revoke Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Enter an email address to change privilege levels
                </p>
                <div className="max-w-md relative">
                  <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="adminEmail"
                    value={adminEmail}
                    onChange={(e) => {
                      setAdminEmail(e.target.value);
                      setAdminSelectedFromList(false);
                      setSelectedUserPermission(null);
                      setShowUserDropdown(true);
                    }}
                    onFocus={() => setShowUserDropdown(true)}
                    onBlur={() => setTimeout(() => setShowUserDropdown(false), 150)}
                    placeholder="user@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  {showUserDropdown && filteredUsers.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {filteredUsers.map((u) => (
                        <li
                          key={u.email}
                          onMouseDown={() => {
                            setAdminEmail(u.email);
                            setAdminSelectedFromList(true);
                            setSelectedUserPermission(u.permission);
                            setShowUserDropdown(false);
                          }}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-800"
                        >
                          {u.name && <span className="font-medium">{u.name} — </span>}
                          {u.email}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {adminEmail.trim() && !adminSelectedFromList && (
                  <p className="text-sm text-red-600">Please select a user from the list.</p>
                )}
                <div className="flex gap-3">
                  {adminSelectedFromList && selectedUserPermission === 'user' && (
                    <Button
                      onClick={handleAddAdmin}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Grant Admin Access
                    </Button>
                  )}
                  {adminSelectedFromList && selectedUserPermission === 'admin' && (
                    <Button
                      onClick={handleRemoveAdmin}
                      className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white"
                    >
                      Remove Admin
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NEXT YEAR SECTION */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Next Year ({nextGame})</h2>
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

          {/* LAST YEAR SECTION */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Last Year ({nextGame - 1})</h2>

            <Card className="bg-white/95 backdrop-blur shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  {nextGame - 1} Questions - Enter Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(validUpdateStatus === "error" || resultUpdateStatus === "error") && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-lg flex items-start justify-between gap-2">
                    <p className="text-sm text-red-700">
                      {validUpdateStatus === "error"
                        ? `Failed to update validity: ${validUpdateError}`
                        : `Failed to update result: ${resultUpdateError}`}
                    </p>
                    <button
                      onClick={() => { setValidUpdateStatus("idle"); setResultUpdateStatus("idle"); }}
                      className="text-red-500 hover:text-red-700 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div className="mb-4 flex gap-3">
                  {releasedYear === nextGame - 2 && (
                    <Button
                      onClick={() => {
                        setComputeStatus("saving");
                        setComputeError(null);
                        startTransition(async () => {
                          const res = await computeResults(nextGame - 1);
                          if (!res.ok) {
                            setComputeStatus("error");
                            setComputeError(res.error ?? "Unknown error");
                            return;
                          }
                          setComputeStatus("success");
                          setReleasedYear(nextGame - 1);
                          setTimeout(() => setComputeStatus("idle"), 2000);
                        });
                      }}
                      disabled={computeStatus === "saving"}
                      className="bg-gradient-to-r from-[#228B22] to-blue-600 hover:from-[#1a6b1a] hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {computeStatus === "saving" ? "Computing..." : "Compute and Release Results"}
                    </Button>
                  )}
                  {releasedYear >= nextGame - 1 && (
                    <Button
                      onClick={() => {
                        startTransition(async () => {
                          const res = await setReleasedYearAction(nextGame - 2);
                          if (res.ok) setReleasedYear(nextGame - 2);
                        });
                      }}
                      className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white"
                    >
                      Hide Results
                    </Button>
                  )}
                </div>

                {computeStatus === "success" && (
                  <p className="text-sm text-green-700 mb-4">Results computed and released successfully.</p>
                )}
                {computeStatus === "error" && (
                  <p className="text-sm text-red-700 mb-4">Failed to compute results: {computeError}</p>
                )}

                {lastYearQuestions.length > 0 ? (
                  <div className="space-y-3">
                    {lastYearQuestions.map((q, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          !q.isvalid
                            ? 'bg-gray-100 border-gray-300'
                            : q.result !== null
                            ? 'bg-green-50 border-green-300'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className={`text-sm ${!q.isvalid ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                              {q.text}
                            </p>
                            {!q.isvalid && (
                              <p className="text-xs text-red-600 mt-1 font-medium">INVALIDATED</p>
                            )}
                            {q.result !== null && q.isvalid && (
                              <p className="text-xs text-green-700 mt-1 font-medium">
                                Result: {q.result ? 'TRUE' : 'FALSE'}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {releasedYear >= nextGame - 1 ? null : (<>
                            {q.isvalid && (
                              <>
                                <Button
                                  onClick={() => handleSetResult(index, true)}
                                  className={`${
                                    q.result === true
                                      ? 'bg-green-600 hover:bg-green-700'
                                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                  } text-white`}
                                  size="sm"
                                >
                                  True
                                </Button>
                                <Button
                                  onClick={() => handleSetResult(index, false)}
                                  className={`${
                                    q.result === false
                                      ? 'bg-green-600 hover:bg-green-700'
                                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                  } text-white`}
                                  size="sm"
                                >
                                  False
                                </Button>
                              </>
                            )}
                            {!q.isvalid ? (
                              <Button
                                onClick={() => handleRevalidateQuestion(index)}
                                variant="ghost"
                                size="sm"
                                className="text-green-700 bg-red-100 hover:bg-green-100 hover:text-green-800"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Revalidate
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleInvalidateQuestion(index)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Ban className="w-4 h-4 mr-1" />
                                Invalidate
                              </Button>
                            )}
                            </>)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No questions from {nextGame - 1} to review.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

