import IError from '../interfaces/error.interface';

const errorGenerator = (status: number, message: string): IError => ({ status, message });

export default errorGenerator;