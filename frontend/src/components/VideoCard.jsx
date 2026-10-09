import { Play, Instagram, Youtube } from "lucide-react";
import AnimatedCard from "./AnimatedCard";

const platformIcon = { youtube: Youtube, instagram: Instagram };

const VideoCard = ({ video }) => {
  const Icon = platformIcon[video.platform] || Play;
  return (
    <AnimatedCard className="group">
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[9/16] w-full overflow-hidden rounded-3xl bg-char shadow-sm"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char via-char/10 to-transparent" />
        <div className="absolute right-3 top-3 rounded-full bg-cream/90 p-2 text-char">
          <Icon size={16} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-ember/90 p-4">
            <Play className="text-cream" size={22} fill="currentColor" />
          </span>
        </div>
        <p className="absolute bottom-4 left-4 right-4 font-display text-sm font-semibold text-cream">
          {video.title}
        </p>
      </a>
    </AnimatedCard>
  );
};

export default VideoCard;
