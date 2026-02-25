"use server"
import {authedFetch, type ActionResult} from "@/lib/actionUtils";


export async function getAnswers(uid: number): Promise<ActionResult<any>> {
    const url = `${process.env.BACKEND_URL}/api/answers/userid?userid=${encodeURIComponent(uid)}`;
    return authedFetch(url, {method: "GET"})
}


export async function postAnswers(answers: {probability: number, questionid: number}[]): Promise<ActionResult<any>>{
    const url = `${process.env.BACKEND_URL}/api/answers/many`;
    return authedFetch(url, {method: "POST",  body: JSON.stringify({answers: answers})})
}

