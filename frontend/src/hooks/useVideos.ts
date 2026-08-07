import { videoService } from "@/services/videoService";
import { useQuery } from "@tanstack/react-query";

export function useVideos(favorites = false) {
  return useQuery({
    queryKey: ["videos", favorites],
    queryFn: () => videoService.getVideos(favorites),
  });
}