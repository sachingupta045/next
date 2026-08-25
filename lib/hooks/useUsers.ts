"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi, UserCreate } from "@/lib/api";

export const USER_KEYS = {
  all: ["users"] as const,
  lists: () => [...USER_KEYS.all, "list"] as const,
  details: () => [...USER_KEYS.all, "detail"] as const,
  detail: (id: number) => [...USER_KEYS.details(), id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: USER_KEYS.lists(),
    queryFn: () => usersApi.list(),
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserCreate) => usersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
  });
}
