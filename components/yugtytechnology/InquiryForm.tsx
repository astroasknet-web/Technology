"use client";

import { useState } from "react";
import { BUDGETS, PROJECT_KINDS } from "@/lib/yugtytechnology/content";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

/** Project brief form. Posts to /api/inquiry; the server validates again and delivers it by email. */
export default function InquiryForm({ preset }: { preset?: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      form.reset();
      setState({ kind: "done" });
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }

  if (state.kind === "done") {
    return (
      <div className="yt-done" role="status">
        <h2>Thank you. We have your brief.</h2>
        <p>We will read it and reply with questions or a plan. Keep an eye on your inbox.</p>
      </div>
    );
  }

  return (
    <form className="yt-form" onSubmit={submit} noValidate={false}>
      <div className="yt-row">
        <label>Your name<input name="name" required minLength={2} maxLength={80} autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required maxLength={120} autoComplete="email" /></label>
      </div>
      <div className="yt-row">
        <label>Phone (optional)<input name="phone" type="tel" maxLength={30} autoComplete="tel" /></label>
        <label>Company (optional)<input name="company" maxLength={100} autoComplete="organization" /></label>
      </div>
      <div className="yt-row">
        <label>What do you want to build?
          <select name="kind" defaultValue={preset && PROJECT_KINDS.includes(preset) ? preset : "Not sure yet"}>
            {PROJECT_KINDS.map((k) => <option key={k}>{k}</option>)}
          </select>
        </label>
        <label>Budget range
          <select name="budget" defaultValue="Not decided">
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
      </div>
      <label>Tell us about the project
        <textarea name="message" required minLength={20} maxLength={4000} rows={6} placeholder="What problem are you solving, who uses it, and when do you need it?" />
      </label>
      <label className="yt-hp" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="yt-note">We use your details only to reply to this brief. See our <a href="/privacy">privacy note</a>.</p>
      {state.kind === "error" ? <p className="yt-err" role="alert">{state.message}</p> : null}
      <button className="vl-btn vl-btn-primary" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Send my brief"}
      </button>
    </form>
  );
}
