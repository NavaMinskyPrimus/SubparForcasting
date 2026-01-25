// app/instructions/page.tsx
import styles from "./Instructions.module.css";
import LogoutButton from "./logoutbutton";

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
      {/* Small blue bar with logout only */}
      <div className={styles.topBar}>
        <LogoutButton />
      </div>

      {/* Top image (not a banner overlay) */}
      <img
        src="/banner.png"
        alt="Subparforecasting illustration"
        className={styles.topImage}
      />

      {/* Full document text */}
      <div className={styles.page}>
        <h1 className={styles.title}>Subparforecasting 2026!!</h1>

        <p className={styles.meta}>
          (Not interested in reading any of this? You can just go and answer the questions here.)
        </p>

        <p className={styles.lede}>
          For the sixth year, we’re doing a weird and supposedly fun activity to celebrate the New Year:
          we’re all going to try to be superforecasters. Since we’re not great at it, we call it
          subparforecasting instead!
        </p>

        <p>
          Superforecasting is a concept developed by Philip Tetlock, who runs competitions in which people
          make predictions and are evaluated over time on the quality of their predictions. The people who
          do best earn the title “superforecasters”. Those so-called superforecasters have racked up an
          impressive record, beating out CIA analysts and other expert forecasters.
        </p>

        <p>
          Tetlock wrote a book about this effort, and there’s a nice interview with him on the Ezra Klein
          show (interviewed by Julia Galef, whose book <em>The Scout Mindset</em> we also recommend!)
        </p>

        <p className={styles.meta}>
          The questions are here. All responses must be submitted by end-of-day,{" "}
          <strong>Monday, January 19th</strong> (we pushed the deadline back one day). You can submit
          multiple times. We’ll only count the last submission. And feel free to do the form with a partner.
        </p>

        <Callout title="Instructions">
          <ul className={styles.list}>
            <li>Try to put in an answer for every question. Blanks will be treated as 50/50 guesses.</li>
            <li>The questions are written to be settleable by December 1st.</li>
            <li>We’ll generate a final report when it’s all said and done.</li>
            <li>If you’re interested, here are the reports from previous years.</li>
          </ul>
        </Callout>

        <article className={styles.article}>
          <section className={styles.section}>
            <h2 className={styles.h2}>Closer-to-par forecasting</h2>

            <p>
              Still reading? Then maybe you want to learn how to be a little better at making forecasts.
              Here are some ideas about how to do better!
            </p>

            <h3 className={styles.h3}>Don’t be too confident</h3>
            <p>
              People are often tempted to predict events as either 0% or 100%. But back in 2021 when a lot
              of people did this, only 50% of those guesses were correct! Also, the way we do the scoring,
              if you say you’re entirely confident and you turn out to be wrong, it’s worth negative
              infinity points, so it might not be the best way to win the game. Plus, last year, we found
              that 88% of people were overconfident! That means they would have done better if they
              systematically made all their guesses closer to 50/50.
            </p>

            <h3 className={styles.h3}>Look for comparison classes</h3>
            <p>
              People often take the inside view of a prediction: they think about the details, and how
              those details influence the result. But it can be helpful to also consider the outside view,
              i.e., to come up with some analogous class of similar events, and consider how those turned
              out. For example, if there’s a question about whether a sequel was going to do better than
              the original movie, you could think about other sequels and how often they do better than the
              original, rather than thinking hard about the twists and turns of this particular movie.
            </p>

            <h3 className={styles.h3}>Look at other sources</h3>
            <p>
              Doing a bit of google searching or talking to a better informed friend is totally within the
              spirit of the game. After all, that’s how we get data in real life (and in real life, we’re
              usually pretty bad at making forecasts, even so!)
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Scoring</h2>

            <p>We’ll give two explanations for how scoring works.</p>

            <h3 className={styles.h3}>Less technical</h3>
            <p>
              In effect, we rank participants based on “how surprised” they are by the final results. More
              specifically, all participants are ranked based on how probable the actual outcome was
              according to the probabilities they put down.
            </p>

            <p>
              Consider the scenario with two questions, where question 1 ends up being true, and 2 ends up
              being false. And say we have 4 players, who made the following guesses:
            </p>

            <ul className={styles.list}>
              <li>Player A: 75%, 75%</li>
              <li>Player B: 50%, 50%</li>
              <li>Player C: 75%, 25%</li>
              <li>Player D: 25%, 75%</li>
            </ul>

            <p>
              Now let’s calculate how likely each player thinks the real outcome would have been. Note that
              to do this, we multiply the probability each player gave to each outcome — that means taking
              the raw probability for questions that settled to True, and 100 percent minus the raw
              probability for questions that settle to False.
            </p>

            <div className={styles.exampleBlock}>
              <div className={styles.exampleTitle}>Example (two questions)</div>

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
                Thus, the ranking would be: <strong>C, B, A, D</strong>.
              </p>

              <p className={styles.exampleText}>
                This ranking should make intuitive sense. For instance, player C should do better than B
                because player C thought it was more likely than not for question 1 to be True (which it
                was) and for question 2 to be False (which it was) where player B just said 50% for both.
                And player A should do better than player D, because they both said the same thing for
                question 2, but for question 1 player A thought it was more likely True than player D, and
                it was in fact True.
              </p>
            </div>

            <h3 className={styles.h3}>Technical</h3>
            <p>
              Your score is the average of the log probabilities you gave to each outcome, normalized where
              a guess of 50% for each question goes to 0.
            </p>

            <footer className={styles.footerNote}>That’s it. Go forth and forecast!</footer>
          </section>
        </article>
      </div>
    </main>
  );
}
