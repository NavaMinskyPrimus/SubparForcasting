// app/instructions/page.tsx
import styles from "./Instructions.module.css";
import LogoutButton from "./logoutbutton";

type TocItem = { id: string; label: string };

const toc: TocItem[] = [
  { id: "overview", label: "What this is" },
  { id: "how-to", label: "How to forecast better" },
  { id: "scoring", label: "Scoring" },
];

function Toc() {
  return (
    <nav className={styles.toc} aria-label="On this page">
      <div className={styles.tocTitle}>On this page</div>
      <ul className={styles.tocList}>
        {toc.map((item) => (
          <li key={item.id}>
            <a className={styles.tocLink} href={`#${item.id}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.callout} aria-label={title}>
      <div className={styles.calloutTitle}>{title}</div>
      <div className={styles.calloutBody}>{children}</div>
    </section>
  );
}

export default function InstructionsPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerTopRow}>
          <h1 className={styles.h1}>Subparforecasting, 2026</h1>
          <LogoutButton />
        </div>
        <h1 className={styles.h1}>Subparforecasting, 2026</h1>
        <p className={styles.lede}>
          For the sixth year, we’re doing a weird and supposedly fun activity to celebrate the New Year:
          we’re all going to try to be superforecasters. Since we’re not great at it, we call it
          subparforecasting instead!
        </p>
        <p className={styles.meta}>
          Responses must be submitted by end-of-day, <strong>Monday, January 19th</strong>. You can submit
          multiple times; we’ll only count the last submission. Feel free to do the form with a partner.
        </p>
      </header>

      <div className={styles.contentGrid}>
        <Toc />

        <article className={styles.article}>
          <section id="overview" className={styles.section}>
            <h2 className={styles.h2}>What this is</h2>

            <p>
              Superforecasting is a concept developed by Philip Tetlock, who runs competitions in which
              people make predictions and are evaluated over time on the quality of their predictions.
              The people who do best earn the title “superforecasters”.
            </p>

            <p>
              Tetlock wrote a book about this effort, and there’s a nice interview with him on the Ezra
              Klein show (interviewed by Julia Galef, whose book <em>The Scout Mindset</em> we also recommend).
            </p>

            <Callout title="Instructions">
              <ul className={styles.list}>
                <li>Try to put in an answer for every question. Blanks will be treated as 50/50 guesses.</li>
                <li>The questions are written to be settleable by December 1st.</li>
                <li>We’ll generate a final report when it’s all said and done.</li>
              </ul>
            </Callout>
          </section>

          <section id="how-to" className={styles.section}>
            <h2 className={styles.h2}>Closer-to-par forecasting</h2>

            <p>
              Still reading? Then maybe you want to learn how to be a little better at making forecasts.
              Here are some ideas about how to do better.
            </p>

            <h3 className={styles.h3}>Don’t be too confident</h3>
            <p>
              People are often tempted to predict events as either 0% or 100%. But back in 2021 when a
              lot of people did this, only 50% of those guesses were correct. Also, the way we do the
              scoring, if you say you’re entirely confident and you turn out to be wrong, it’s worth
              negative infinity points.
            </p>
            <p>
              Plus, last year, we found that 88% of people were overconfident. That means they would
              have done better if they systematically made all their guesses closer to 50/50.
            </p>

            <h3 className={styles.h3}>Look for comparison classes</h3>
            <p>
              People often take the inside view of a prediction: they think about the details, and how
              those details influence the result. But it can be helpful to also consider the outside view:
              come up with an analogous class of similar events, and consider how those turned out.
            </p>

            <h3 className={styles.h3}>Look at other sources</h3>
            <p>
              Doing a bit of google searching or talking to a better informed friend is totally within the
              spirit of the game. After all, that’s how we get data in real life.
            </p>
          </section>

          <section id="scoring" className={styles.section}>
            <h2 className={styles.h2}>Scoring</h2>

            <h3 className={styles.h3}>Less technical</h3>
            <p>
              In effect, we rank participants based on “how surprised” they are by the final results. More
              specifically, all participants are ranked based on how probable the actual outcome was
              according to the probabilities they put down.
            </p>

            <div className={styles.exampleBlock}>
              <div className={styles.exampleTitle}>Example (two questions)</div>
              <p className={styles.exampleText}>
                If Q1 is True and Q2 is False, compute a player’s likelihood by multiplying:
                (their probability on outcomes that happen) × (1 − their probability on outcomes that don’t).
              </p>

              <div className={styles.tableWrap} role="region" aria-label="Scoring example table">
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Guess (Q1, Q2)</th>
                      <th>Implied likelihood</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A</td>
                      <td>75%, 75%</td>
                      <td>75% × 25% = 18.75%</td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td>50%, 50%</td>
                      <td>50% × 50% = 25%</td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td>75%, 25%</td>
                      <td>75% × 75% = 56%</td>
                    </tr>
                    <tr>
                      <td>D</td>
                      <td>25%, 75%</td>
                      <td>25% × 25% = 6.25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className={styles.exampleText}>
                Ranking: C, B, A, D.
              </p>
            </div>

            <h3 className={styles.h3}>Technical</h3>
            <p>
              Your score is the average of the log probabilities you gave to each outcome, normalized so that
              a guess of 50% for each question goes to 0.
            </p>
          </section>

          <footer className={styles.footerNote}>
            That’s it. Go forth and forecast.
          </footer>
        </article>
      </div>
    </main>
  );
}
