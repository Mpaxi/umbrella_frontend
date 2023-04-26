export interface Usuario {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    cargo: string;
    situacao: boolean;
}

export const usuarios: Usuario[] = [
    { id: 1, nome: "admin", cpf: "60912990007" , email: "admin@admin", cargo: "admin", situacao:true },
    { id: 2, nome: "admin", cpf: "85962663055", email: "admin@admin", cargo: "estoquista", situacao:false }
]