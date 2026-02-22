import { describe, it, expect, vi } from 'vitest';

// Supabase client mock — program-search.ts top-level import ediyor
vi.mock('@/lib/supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            or: vi.fn().mockReturnThis(),
            order: vi.fn().mockReturnThis(),
            range: vi.fn().mockReturnThis(),
            limit: vi.fn().mockReturnThis(),
        })),
    },
}));

import { getDegreeLabel } from '@/lib/program-search';

describe('getDegreeLabel', () => {
    it('BACHELOR için Lisans döndürmeli', () => {
        expect(getDegreeLabel('BACHELOR')).toBe('Lisans');
    });

    it('Lisans için Lisans döndürmeli (büyük/küçük harf duyarsız)', () => {
        expect(getDegreeLabel('Lisans')).toBe('Lisans');
    });

    it('MASTER için Yüksek Lisans döndürmeli', () => {
        expect(getDegreeLabel('MASTER')).toBe('Yüksek Lisans');
    });

    it('MASTER WITH THESIS için Yüksek Lisans döndürmeli', () => {
        expect(getDegreeLabel('MASTER WITH THESIS')).toBe('Yüksek Lisans');
    });

    it('PHD için Doktora döndürmeli', () => {
        expect(getDegreeLabel('PHD')).toBe('Doktora');
    });

    it('ASSOCIATE için Önlisans döndürmeli', () => {
        expect(getDegreeLabel('ASSOCIATE')).toBe('Önlisans');
    });

    it('bilinmeyen derece için aynı değeri döndürmeli', () => {
        expect(getDegreeLabel('UNKNOWN')).toBe('UNKNOWN');
    });
});
