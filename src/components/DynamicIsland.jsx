export default function DynamicIsland({ onAnimationComplete }) {
  return (
    <div
      className="dynamic-island-container"
      onAnimationEnd={onAnimationComplete}
    >
      <span className="pills">
        <div className="container-img">
          <img
            loading="lazy"
            src={
              new URL(
                "../../public/assets/Face-ID-Successful.gif",
                import.meta.url
              ).href
            }
            alt="Dynamic Island"
          />
        </div>
      </span>
    </div>
  );
}
