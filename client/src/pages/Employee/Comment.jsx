import { useEffect, useState } from "react"
import { User } from "lucide-react"

/* ---------- Time formatter ---------- */
const formatTime = (date) => {
  if (!date) return "-";

  const now = new Date();

  // original date
  const dObj = new Date(date);

  // subtract 5h 30m
  dObj.setMinutes(dObj.getMinutes() - 330);

  const diffMs = now - dObj;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;

  // Today
  const isToday =
    now.toDateString() === dObj.toDateString()

  if (isToday) {
    return `Today, ${dObj.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }

  // Yesterday
  const yesterday = new Date()
  yesterday.setDate(now.getDate() - 1)

  if (yesterday.toDateString() === dObj.toDateString()) {
    return `Yesterday, ${dObj.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }

  return dObj.toLocaleString("en-IN", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


export default function Comments({ com_data = [], exp_id }) {
  /* ---------- Map API comments ---------- */
  const [comments, setComments] = useState([])
  console.log(com_data)

  useEffect(() => {
    if (!com_data?.length) return

    const mapped = com_data.map((c, i) => ({
      id: i,
      name: c.sender_name || "User",
      time: formatTime(c.created_at),
      text: c.message,
    }))

    setComments(mapped)
  }, [com_data])

  /* ---------- New comment ---------- */
  const [newComment, setNewComment] = useState("")

  const addCommentLocal = (text) => {
    setComments((prev) => [
      {
        id: Date.now(),
        name: "You",
        time: "Just now",
        text,
      },
      ...prev,
    ])
  }

  /* ---------- POST comment ---------- */
  const postComment = async (text) => {
    if (!text.trim()) return

    const toId = "E_100001"

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}expenses/notification/${toId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          exp_id,
        }),
      }
    )

    return res.ok
  }

  /* ---------- Handler ---------- */
  const handlePostComment = async () => {
    if (!newComment.trim()) return

    addCommentLocal(newComment)
    await postComment(newComment)
    setNewComment("")
  }

  return (
    <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-semibold text-gray-800">
        Comments
      </h3>

      <div className="flex gap-2">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="
            flex-1
            border border-orange-200
            rounded-xl
            px-3 py-2
            text-xs
            focus:outline-none
            focus:ring-2
            focus:ring-orange-200
          "
        />

        <button
          onClick={handlePostComment}
          className="
            px-4 py-2
            text-xs
            rounded-xl
            bg-orange-500
            text-white
            hover:bg-orange-600
            transition
          "
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="flex gap-3 border-t border-gray-100 pt-4"
          >
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
              <User size={16} className="text-orange-600" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-gray-800">
                  {c.name}
                </p>
                <span className="text-[11px] text-gray-500">
                  {c.time}
                </span>
              </div>

              <p className="text-xs text-gray-700 mt-1">
                {c.text}
              </p>

              <button className="text-[11px] text-orange-600 mt-2 hover:underline">
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
