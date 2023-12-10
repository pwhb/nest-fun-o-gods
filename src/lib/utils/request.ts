export function getPermissionName(originalUrl: string, method: string)
{
    const [_, api, version, slug, path] = originalUrl.split("/");

    switch (method)
    {
        case "POST": return `create-${slug}`;
        case "GET": return `read-${slug}`;
        case "PATCH": return `update-${slug}`;
        case "DELETE": return `delete-${slug}`;
    }
}