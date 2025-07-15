import { useQuery } from "@tanstack/react-query";
import { todoget } from "./api";

export const todoGetQuery = () => useQuery({
    queryKey: ["todo"],
    queryFn: async () => await todoget(),
})