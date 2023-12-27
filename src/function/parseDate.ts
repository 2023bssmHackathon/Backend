export async function parseDate(data) {
  const modifiedData = (await data).map((item) => {
    const modifiedCreatedAt = item.createdAt
      .toISOString()
      .replace('T', ' ')
      .split('.')[0];
    return {
      ...item,
      createdAt: modifiedCreatedAt,
    };
  });
  return modifiedData;
}
