// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private isNightMode = false;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleTheme(): void {
    this.isNightMode = !this.isNightMode;
    this.applyTheme();
  }
  togglesensorName(){
    
  }
  // private applyTheme(): void {
  //   const body = document.body;
  //   if (this.isNightMode) {
  //     this.renderer.addClass(body, 'night-mode');
  //   } else {
  //     this.renderer.removeClass(body, 'night-mode');
  //   }
  // }
  private applyTheme(): void {
    const elements = document.querySelectorAll('.change'); // Replace 'your-element-class' with the actual class name
    const body = document.body;
  
    elements.forEach((element) => {
      if (this.isNightMode) {
        this.renderer.addClass(element, 'night-mode');
        
      } else {
        this.renderer.removeClass(element, 'night-mode');
        
      }
    });
    if (this.isNightMode) {
          this.renderer.addClass(body, 'night-mode');
        } else {
          this.renderer.removeClass(body, 'night-mode');
        }
    
  }


}
