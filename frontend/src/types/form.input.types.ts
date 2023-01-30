export interface IFormInput {
    name: string;
    errorMessage?: string;
    validation?: string;
    title: string;
    validator?: RegExp | any;
    type?: string;
    fullWidth?: boolean;
    marginBottom?: number;
}