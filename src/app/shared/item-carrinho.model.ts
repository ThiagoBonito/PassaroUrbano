class ItemCarrinho {
    constructor(
        public id: number,
        public img: any,
        public titulo: string,
        public descricao_oferta: string,
        public valor: number,
        public quantidade: number
    ) {}
}
export {ItemCarrinho}