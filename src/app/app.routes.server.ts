import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'detailsprod/:id',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'detailsCatg/:category',
    renderMode: RenderMode.Prerender,
  },
];
