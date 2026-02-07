export type QuestionRow = {
  questionid: number;
  text: string;
};
export type ActionResult<T> = { ok: true; data: T}  | { ok: false; error: string };
