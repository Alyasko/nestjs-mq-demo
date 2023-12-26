import { Injectable } from '@nestjs/common';

/**
 * Service for managing storage of items.
 * @template T - The type of items stored in the storage service.
 */
@Injectable()
export class StorageService<T extends { id: string }> {
    private items: T[] = [];

    /**
     * Adds an item to the storage.
     * @param item - The item to be added.
     * @returns The added item.
     */
    add(item: T): T {
        this.items.push(item);
        return item;
    }

    /**
     * Replaces an item in the storage with a new item.
     * @param id - The ID of the item to be replaced.
     * @param item - The new item.
     * @returns The replaced item, or null if the item with the specified ID was not found.
     */
    replace(id: string, item: T): T {
        const itemIndex = this.items.findIndex(i => i.id === id);
        if (itemIndex === -1) {
            return null;
        }

        this.items[itemIndex] = item;

        return item;
    }

    /**
     * Deletes an item from the storage.
     * @param id - The ID of the item to be deleted.
     * @returns True if the item was successfully deleted, false otherwise.
     */
    delete(id: string): boolean {
        const itemIndex = this.items.findIndex(i => i.id === id);
        if (itemIndex === -1) {
            return false;
        }

        this.items.splice(itemIndex, 1);

        return true;
    }

    /**
     * Retrieves an item from the storage by its ID.
     * @param id - The ID of the item to be retrieved.
     * @returns The retrieved item, or null if the item with the specified ID was not found.
     */
    get(id: string): T | null {
        const item = this.items.find(i => i.id === id);
        return item || null;
    }

    /**
     * Retrieves all items from the storage.
     * @returns An array of all items in the storage.
     */
    getAll(): T[] {
        return this.items;
    }
}
