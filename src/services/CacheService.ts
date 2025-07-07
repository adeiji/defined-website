import { EmployeeDocument, PayingClient } from '../models/models';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class CacheService {
  private static instance: CacheService;
  private cache: Map<string, CacheEntry<any>> = new Map();

  // Cache durations in milliseconds
  private static readonly CACHE_DURATIONS = {
    EMPLOYEES: 5 * 60 * 1000, // 5 minutes for employee data
    CUSTOMERS: 10 * 60 * 1000, // 10 minutes for customer data
    DEFAULT: 5 * 60 * 1000 // 5 minutes default
  };

  private constructor() {}

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  /**
   * Set data in cache with automatic expiry
   */
  set<T>(key: string, data: T, duration?: number): void {
    const expiry = Date.now() + (duration || CacheService.CACHE_DURATIONS.DEFAULT);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  }

  /**
   * Get data from cache, returns null if expired or not found
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Check if a key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Remove specific key from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Remove expired entries
   */
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.cache.forEach((entry, key) => {
      if (now > entry.expiry) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => {
      this.cache.delete(key);
    });
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Specific cache methods for common data types

  /**
   * Cache active employees
   */
  setActiveEmployees(employees: EmployeeDocument[]): void {
    this.set('employees:active', employees, CacheService.CACHE_DURATIONS.EMPLOYEES);
  }

  /**
   * Get cached active employees
   */
  getActiveEmployees(): EmployeeDocument[] | null {
    return this.get<EmployeeDocument[]>('employees:active');
  }

  /**
   * Cache customer data
   */
  setCustomer(customerId: string, customer: PayingClient): void {
    this.set(`customer:${customerId}`, customer, CacheService.CACHE_DURATIONS.CUSTOMERS);
  }

  /**
   * Get cached customer data
   */
  getCustomer(customerId: string): PayingClient | null {
    return this.get<PayingClient>(`customer:${customerId}`);
  }

  /**
   * Invalidate customer cache (useful when customer is updated)
   */
  invalidateCustomer(customerId: string): void {
    this.delete(`customer:${customerId}`);
  }

  /**
   * Invalidate all customer caches
   */
  invalidateAllCustomers(): void {
    const keysToDelete: string[] = [];
    
    this.cache.forEach((entry, key) => {
      if (key.startsWith('customer:')) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => {
      this.cache.delete(key);
    });
  }

  /**
   * Invalidate employee cache
   */
  invalidateEmployees(): void {
    this.delete('employees:active');
  }
}

export default CacheService;