import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService<T extends { id: string }> {
    private items: T[] = [];

    add(item: T): T {
        this.items.push(item);
        return item;
    }

    replace(id: string, item: T): T {
        const itemIndex = this.items.findIndex(i => i.id === id);
        if (itemIndex === -1) {
            return null;
        }

        this.items[itemIndex] = item;

        return item;
    }

    delete(id: string): boolean {
        const itemIndex = this.items.findIndex(i => i.id === id);
        if (itemIndex === -1) {
            return false;
        }

        this.items.splice(itemIndex, 1);

        return true;
    }

    get(id: string): T | null {
        const item = this.items.find(i => i.id === id);
        return item || null;
    }

    getAll(): T[] {
        return this.items;
    }
}
