import { FileFolderTree } from '../interfaces';
export declare function isDirectChild(parent: string, possibleChild: string): boolean;
export declare function isChild(parent: string, possibleChild: string): boolean;
export declare function arrayToTree(input: Array<string>, root: string): FileFolderTree;
export declare function addFilesToTree(tree: FileFolderTree, files: Array<string>, root: string): FileFolderTree;
