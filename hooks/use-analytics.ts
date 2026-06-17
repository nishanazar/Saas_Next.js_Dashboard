import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ApiService } from "@/lib/api/api-service"
import { QUERY_KEYS } from "@/lib/constants"
import { User, AppSettings, Report } from "@/types"

/**
 * Middle-level best practice: Using Query Key Factories
 * This prevents bugs caused by mismatched query keys across the app.
 */

// Users Hooks
export function useUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: ApiService.users.getAll,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ApiService.users.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ApiService.users.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] })
    },
  })
}

// Analytics Hooks
export function useRevenue() {
  return useQuery({
    queryKey: [QUERY_KEYS.REVENUE],
    queryFn: ApiService.analytics.getRevenue,
  })
}

export function useSubscriptions() {
  return useQuery({
    queryKey: [QUERY_KEYS.SUBSCRIPTIONS],
    queryFn: ApiService.analytics.getSubscriptions,
  })
}

// Settings Hooks
export function useSettings() {
  return useQuery({
    queryKey: [QUERY_KEYS.SETTINGS],
    queryFn: ApiService.settings.get,
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ApiService.settings.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SETTINGS] })
    },
  })
}

// Reports Hooks
export function useReports() {
  return useQuery({
    queryKey: [QUERY_KEYS.REPORTS],
    queryFn: ApiService.reports.getAll,
  })
}

export function useGenerateReport() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ApiService.reports.generate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPORTS] })
    },
  })
}
