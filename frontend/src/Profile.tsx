import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { profileService } from "@/services/profileService";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function ProfilePage() {
  const query = useProfile();
  const user = query.data?.user;
  const [name, setName] = useState("");

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  const mutation = useMutation({
    mutationFn: () => profileService.updateProfile(name),
    onSuccess: () => query.refetch(),
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white sm:text-3xl">Profile</h1>
      <div className="mt-7 max-w-lg rounded-xl border border-white/10 bg-aether-container-low/40 p-5">
        <label className="block text-sm text-aether-on-surface-variant">
          Display name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input-dark mt-2 w-full rounded-lg p-3 text-base text-white"
          />
        </label>
        <p className="mt-4 text-sm text-aether-on-surface-variant">
          {user?.email}
        </p>
        {mutation.isError && (
          <p className="mt-3 text-sm text-red-300">
            {mutation.error instanceof Error ? mutation.error.message : "Unable to save profile."}
          </p>
        )}
        <Button
          className="mt-5"
          disabled={name.trim().length < 2 || mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          Save profile
        </Button>
      </div>
    </div>
  );
}
