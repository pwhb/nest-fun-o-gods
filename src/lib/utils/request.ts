export function getPermissionName(originalUrl: string, method: string)
{
    const [_, api, version, slug, path] = originalUrl.split("/");
    const regex = /(\w+)\?/;
    const match = slug.match(regex);
    const collection = match ? match[1] : slug;
    
    switch (method)
    {
        case "POST": return `create-${collection}`;
        case "GET": return `read-${collection}`;
        case "PATCH": return `update-${collection}`;
        case "DELETE": return `delete-${collection}`;
    }
}