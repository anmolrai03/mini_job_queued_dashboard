export async function apiHandler<T>(
  url: string , 
  options: RequestInit = {}
): Promise<T>{

  // i forgot the fetch strucrut but like we need method and then the stringified payload if any , and then content type application/json in headerrs , and yeah 
  const res = await fetch(url, options);

  if( !res.ok){
    const errorData = await res.json();

    throw new Error(errorData?.message || "Something went wrong.");
  }

  const data =await res.json();
  return data;
}