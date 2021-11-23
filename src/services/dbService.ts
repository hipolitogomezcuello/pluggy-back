import dynamoRepository from "src/repositories/dynamoRepository"

const findByKey = async (key: string, tableName: string) => {
  const response = await dynamoRepository.get(key, tableName);
  return JSON.parse(response.body);
}

const save = async (key: string, tableName: string, value: any) => {
  const response = await dynamoRepository.write(key, tableName, JSON.stringify(value));
  return JSON.parse(response);
}

export default {
  findByKey,
  save
}