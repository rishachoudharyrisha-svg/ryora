import { profileService } from "@/services/profileService";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
  });
}