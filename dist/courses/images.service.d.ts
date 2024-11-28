export declare class ImageService {
    private readonly uploadsPath;
    constructor();
    private ensureUploadsDirectory;
    saveImage(file: Express.Multer.File): Promise<string>;
    deleteImage(filename: string): Promise<void>;
}
