"use server"
import {authedFetch, type ActionResult} from "@/lib/actionUtils";


export async function getQuestions(year: number): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/questions/year?year=${encodeURIComponent(year)}`;
  return authedFetch(url, {method: "GET"})
}

export async function deleteQuestion(qid: number): Promise<ActionResult<any>>{
  const url = `${process.env.BACKEND_URL}/api/questions`;
  return authedFetch(url, {method: "DELETE", body: JSON.stringify({ questionid: qid })})
}

export async function editQuestion(qid: number, newText: string):Promise<ActionResult<any>>{
  const url = `${process.env.BACKEND_URL}/api/questions`;
  return authedFetch(url, {method: "PUT", body: JSON.stringify({ questionid: qid, text: newText})})
}
export async function addQuestion(text: string):Promise<ActionResult<any>>{
  const url = `${process.env.BACKEND_URL}/api/questions`;
  console.log("is this being called?")
  return authedFetch(url, {method: "POST", body: JSON.stringify({text: text})})
}

export async function getQuestionsWithAnswers(year: number): Promise<ActionResult<any>>{
  const url = `${process.env.BACKEND_URL}/api/questions//with-answers?year=${encodeURIComponent(year)}`;
  return authedFetch(url, {method: "GET"})
}


export async function invalidateQuestion(qid:number): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/questions/isvalid`;
  return authedFetch(url, {method: "PUT", body: JSON.stringify({questionid: qid, isvalid: false})})
}

export async function validateQuestion(qid:number): Promise<ActionResult<any>> {
  const url = `${process.env.BACKEND_URL}/api/questions/isvalid`;
  return authedFetch(url, {method: "PUT", body: JSON.stringify({questionid: qid, isvalid: true})})
}

export async function setResult(qid:number, text: string, result: boolean): Promise<ActionResult<any>> {
   const url = `${process.env.BACKEND_URL}/api/questions`;
  return authedFetch(url, {method: "PUT", body: JSON.stringify({ questionid: qid, text: text, result: result})})
}