import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetalType, TimePeriod, PriceHistory } from '../../models/metal-price.models';
import { MetalPriceService } from '../../services/metal-price.service';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  selectedMetal: MetalType = 'Gold';
  selectedPeriod: TimePeriod = 'Month';

  priceHistory: PriceHistory | null = null;

  loading = false;
  error: string | null = null;

  chart: Chart | null = null;

  statistics = {
    max: 0,
    min: 0,
    average: 0,
    change: 0,
    changePercent: 0
  };

  constructor(private metalService: MetalPriceService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadPriceHistory();
  }

  ngAfterViewInit(): void {
    // Chart will be created after data loading
  }

  onMetalPriceChange(event: any): void {
    this.selectedMetal = event.target.value;
    this.loadPriceHistory();
  }

  onPeriodChange(event: any): void {
    this.selectedPeriod = event.target.value;
    this.loadPriceHistory();
  }

  loadPriceHistory(): void {
    this.loading = true;
    this.error = null;

    this.metalService.getPriceHistory(this.selectedMetal, this.selectedPeriod).subscribe({
      next: (history: PriceHistory) => {
        this.priceHistory = history;
        this.calculateStatistics();
        this.loading = false;
        setTimeout(() => this.createChart(), 100);
      },
      error: (err: any) => {
        this.error = 'Error loading price history';
        this.loading = false;
      }
    })
  }

  private calculateStatistics(): void {
    if (!this.priceHistory || this.priceHistory.data.length === 0) {
      return;
    }

    const prices = this.priceHistory.data.map((point: any) => point.price);

    this.statistics.max = Math.max(...prices);
    this.statistics.min = Math.min(...prices);
    this.statistics.average = prices.reduce((sum: number, price: number) => sum + price, 0) / prices.length;

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    this.statistics.change = lastPrice - firstPrice;
    this.statistics.changePercent = (this.statistics.change / firstPrice) * 100;
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (!this.chartCanvas || !this.chartCanvas.nativeElement || !this.priceHistory) {
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.priceHistory.data.map((point: any) =>
      new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );

    const prices = this.priceHistory.data.map((point: any) => point.price);

    const chartConfig: ChartConfiguration = {
      type: 'line' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          label: `${this.selectedMetal} Price (USD)`,
          data: prices,
          borderColor: this.getMetalColor(this.selectedMetal),
          backgroundColor: this.getMetalColor(this.selectedMetal, 0.1),
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Price (USD per oz)',
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, chartConfig);
  }

  private getMetalColor(metal: MetalType, opacity: number = 1): string {
    const colors: { [key in MetalType]: string } = {
      'Gold': opacity === 1 ? '#FFD700' : `rgba(255, 215, 0, ${opacity})`,
      'Silver': opacity === 1 ? '#C0C0C0' : `rgba(192, 192, 192, ${opacity})`,
      'Platinum': opacity === 1 ? '#E5E4E2' : `rgba(229, 228, 226, ${opacity})`,
      'Copper': opacity === 1 ? '#D4AF37' : `rgba(212, 175, 55, ${opacity})`
    };
    return colors[metal];
  }
}
