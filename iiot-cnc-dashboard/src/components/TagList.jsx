export default function TagList({ title, tags, emptyLabel = "UNAVAILABLE" }) {
  return (
    <section className="card">
      <div className="card-heading">
        <h2>{title}</h2>
      </div>
      <div className="tag-list">
        {tags.length > 0 ? (
          tags.map((tag) => <span key={tag}>{tag}</span>)
        ) : (
          <span className="tag-muted">{emptyLabel}</span>
        )}
      </div>
    </section>
  );
}
