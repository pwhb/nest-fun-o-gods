export async function time(fun: () => any)
{
    const start = Date.now();
    const res = await fun();
    const end = Date.now();
    console.log(`${fun.name}: ${end - start}ms`);
    return res;
}