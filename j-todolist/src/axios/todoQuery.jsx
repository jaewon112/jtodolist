import { useQuery } from "@tanstack/react-query";
import { todoGet } from "./api";

export const todoGetQuery = () => useQuery({
    queryKey: ["todo"],
    queryFn: async () => await todoGet(),
})