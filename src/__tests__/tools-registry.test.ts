import { describe, it, expect } from 'vitest';
import { tools, categories, getToolsByCategory } from '@/lib/tools';

describe('tools registry', () => {
  it('should have 20 tools', () => {
    expect(tools).toHaveLength(20);
  });

  it('should have 6 categories', () => {
    expect(categories).toHaveLength(6);
  });

  it('every tool should have required fields', () => {
    for (const tool of tools) {
      expect(tool.name).toBeTruthy();
      expect(tool.slug).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.category).toBeTruthy();
      expect(tool.icon).toBeTruthy();
    }
  });

  it('every tool category should match a valid category slug', () => {
    const validSlugs = categories.map(c => c.slug);
    for (const tool of tools) {
      expect(validSlugs).toContain(tool.category);
    }
  });

  it('tool slugs should be unique', () => {
    const slugs = tools.map(t => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('getToolsByCategory should filter correctly', () => {
    const encodingTools = getToolsByCategory('encoding');
    expect(encodingTools.length).toBeGreaterThan(0);
    for (const tool of encodingTools) {
      expect(tool.category).toBe('encoding');
    }
  });

  it('getToolsByCategory should return empty for unknown category', () => {
    expect(getToolsByCategory('nonexistent')).toHaveLength(0);
  });

  it('SHA hash tool should not mention MD5 in name', () => {
    const hashTool = tools.find(t => t.slug === 'md5-hash');
    expect(hashTool).toBeDefined();
    expect(hashTool!.name).toBe('SHA Hash Generator');
  });

  it('no tool icons should contain emoji', () => {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    for (const tool of tools) {
      expect(emojiRegex.test(tool.icon), `Tool "${tool.name}" icon "${tool.icon}" contains emoji`).toBe(false);
    }
  });

  it('Developer category should have 6 tools', () => {
    expect(getToolsByCategory('developer')).toHaveLength(6);
  });

  it('PDF & Document category should have 6 tools', () => {
    expect(getToolsByCategory('pdf')).toHaveLength(6);
  });

  it('Generator category should have 3 tools', () => {
    expect(getToolsByCategory('generator')).toHaveLength(3);
  });
});
