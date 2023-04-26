export interface Produto {
    codigo: number;
    nome: string;
    preco: number;
    quantidade: number;
    imagem: string;
    situacao: boolean;
}

export const produtos: Produto[] = [
    { codigo: 1, nome: "teste", preco:200.00, quantidade: 20, imagem:"https://auditeste.com.br/wp-content/uploads/2022/09/teste-online-1.png", situacao: true },
    { codigo:2, nome: "teste2", preco:250.00, quantidade:150, imagem:"", situacao:false }
]