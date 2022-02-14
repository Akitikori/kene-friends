export default function Sound({ audio }) {
  return (
    <audio className="audio-media" controls>
      <source src={audio || ""} type="audio/mpeg" />
      Your browser does not support the <code>audio</code> element.
    </audio>
  );
}
