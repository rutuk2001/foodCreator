import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { getVideos, createVideo, deleteVideo } from "../../api/videos";
import CookingLoader from "../../components/CookingLoader";
import Modal from "../../components/Modal";
import AnimatedButton from "../../components/AnimatedButton";

const emptyForm = { title: "", platform: "youtube", url: "", thumbnail: "" };

const DashboardVideos = () => {
  const [videos, setVideos] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setVideos(null);
    getVideos({ limit: 50 })
      .then((res) => setVideos(res.data.data))
      .catch(() => setVideos([]));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!confirm("Remove this video?")) return;
    await deleteVideo(id);
    toast.success("Video removed");
    load();
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createVideo(form);
      toast.success("Video added");
      setModalOpen(false);
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not add video");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Manage videos</h1>
        <AnimatedButton icon={Plus} onClick={() => setModalOpen(true)} className="!py-2.5 !px-5 text-sm">
          Add video
        </AnimatedButton>
      </div>

      {videos === null ? (
        <CookingLoader />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <div key={v._id} className="relative overflow-hidden rounded-2xl bg-cream-soft dark:bg-espresso-deep">
              <img src={v.thumbnail} alt={v.title} className="aspect-video w-full object-cover" />
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="text-sm font-semibold">{v.title}</p>
                  <p className="font-mono text-xs capitalize text-espresso/50 dark:text-cream/50">{v.platform}</p>
                </div>
                <button onClick={() => handleDelete(v._id)} className="rounded-full p-2 text-ember hover:bg-ember/10">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add a video">
        <form onSubmit={handleCreate} className="space-y-3">
          <input
            required
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <select
            value={form.platform}
            onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          >
            <option value="youtube">YouTube Short</option>
            <option value="instagram">Instagram Reel</option>
          </select>
          <input
            required
            placeholder="Video URL"
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <input
            required
            placeholder="Thumbnail image URL"
            value={form.thumbnail}
            onChange={(e) => setForm((f) => ({ ...f, thumbnail: e.target.value }))}
            className="w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 outline-none focus:border-ember dark:border-cream/15 dark:bg-char"
          />
          <AnimatedButton type="submit" className="w-full justify-center" disabled={saving}>
            {saving ? "Adding..." : "Add video"}
          </AnimatedButton>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardVideos;
