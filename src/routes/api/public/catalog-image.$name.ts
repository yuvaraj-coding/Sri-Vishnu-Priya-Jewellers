import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/catalog-image/$name")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const name = params.name;
        if (!name || name.includes("/") || name.includes("..")) {
          return new Response("Not found", { status: 404 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage
          .from("catalog-images")
          .download(name);

        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }

        return new Response(await data.arrayBuffer(), {
          headers: {
            "Content-Type": data.type || "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
