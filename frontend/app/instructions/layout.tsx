// app/instructions/layout.tsx
import styles from "./Instructions.module.css";

export default function InstructionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
