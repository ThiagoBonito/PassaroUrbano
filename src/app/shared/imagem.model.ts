export class Imagem {
    private _url!: string

    constructor(url: string) { 
        this._url = url
    }

    public get url(): string {
        return this._url
    }

    public set url(url: string) {
        this._url = url
    }
}