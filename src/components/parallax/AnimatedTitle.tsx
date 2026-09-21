/** Splits each line into words, each revealed on its own scroll-timeline
 * stagger (.word-reveal-0..4, defined in globals.css) as the scene scrolls
 * into view. Server-renderable — no client state needed, CSS drives it. */
export default function AnimatedTitle({ lines }: { lines: string[] }) {
  let wordIndex = 0;

  return (
    <>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li}>
            {li > 0 && <br />}
            {words.map((word, wi) => {
              const rangeIndex = Math.min(wordIndex, 4);
              wordIndex += 1;
              return (
                <span key={wi} className="inline-block overflow-hidden pb-1 align-top">
                  <span className={`word-reveal word-reveal-${rangeIndex} inline-block`}>
                    {word}
                    {wi < words.length - 1 ? " " : ""}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}
