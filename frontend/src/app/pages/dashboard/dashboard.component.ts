import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetalPrice } from '../../models/metal-price.models';
import { MetalPriceService } from '../../services/metal-price.service';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  metalPrices: MetalPrice[] = []
  loading = true;
  error: string | null = null;
  chart: Chart | null = null;

  constructor(private metalService: MetalPriceService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadCurrentPrices();
  }

  ngAfterViewInit(): void {
    // Create chart if data is already loaded
    if (this.metalPrices.length > 0 && !this.loading && !this.error) {
      setTimeout(() => this.createChart(), 100);
    }
  }

  loadCurrentPrices(): void {
    this.loading = true;
    this.error = null;

    this.metalService.getCurrentPrices().subscribe({
      next: (prices: MetalPrice[]) => {
        this.metalPrices = prices;
        this.loading = false;
        setTimeout(() => this.createChart(), 100);
      },
      error: (err: any) => {
        this.error = 'Error loading metal prices';
        this.loading = false;
        console.error("Error loading prices", err);
      }
    });
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if(!this.chartCanvas || !this.chartCanvas.nativeElement) {
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const metalNames = this.metalPrices.map(price => this.getMetalDisplayName(price.metal));
    const prices = this.metalPrices.map(price => price.currentPrice);

    const chartConfig: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels: metalNames,
        datasets: [{
          label: 'Current Price (USD)',
          data: prices,
          backgroundColor: [
            '#FFD700', // Gold
            '#C0C0C0', // Silver
            '#E5E4E2', // Platinum
            '#D4AF37'  // Copper
          ],
          borderColor: [
            '#DAA520',
            '#A9A9A9',
            '#BDB76B',
            '#B8860B'
          ],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Current Precious Metal Prices',
            font: {
              family: 'Inter',
              size: 20,
              weight: 'bold'
            },
            color: '#2c3e50'
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            type: 'logarithmic',
            min: 1,
            max: 10000,
            title: {
              display: true,
              text: 'Price (USD per oz)',
              font: {
                family: 'Inter',
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              color: '#f8f9fa'
            },
            ticks: {
              maxTicksLimit: 6,
              callback: function(value: any) {
                // Show only clean values: 1, 10, 100, 1000, etc.
                const cleanValues = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];
                if (cleanValues.includes(Number(value))) {
                  if (value >= 1000) {
                    return '$' + (value/1000).toFixed(0) + 'K';
                  } else {
                    return '$' + value;
                  }
                }
                return '';
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Metal Type',
              font: {
                family: 'Inter',
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    };

    this.chart = new Chart(ctx, chartConfig);
  }

  getMetalDisplayName(metalType: string | number): string {
    const metalNames: { [key: string]: string } = {
      '0': 'Gold',
      '1': 'Silver', 
      '2': 'Platinum',
      '3': 'Copper',
      'Gold': 'Gold',
      'Silver': 'Silver', 
      'Platinum': 'Platinum',
      'Copper': 'Copper'
    };
    return metalNames[metalType.toString()] || metalType.toString();
  }
}
