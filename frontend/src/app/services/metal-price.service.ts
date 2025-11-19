import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetalPrice, PriceHistory, MetalType, TimePeriod } from '../models/metal-price.models';

@Injectable({
  providedIn: 'root',
})
export class MetalPriceService {
  private readonly baseUrl = 'http://localhost:5045/api/MetalPrices';

  constructor(private http: HttpClient) { }

  getCurrentPrices(): Observable<MetalPrice[]> {
    return this.http.get<MetalPrice[]>(`${this.baseUrl}/current`);
  }

  getPriceHistory(metal: MetalType, period: TimePeriod): Observable<PriceHistory> {
    return this.http.get<PriceHistory>(`${this.baseUrl}/history/${metal}/${period}`);
  }

  getAvailableMetals(): Observable<MetalType[]> {
    return this.http.get<MetalType[]>(`${this.baseUrl}/metals`);
  }

  getAvailablePeriods(): Observable<TimePeriod[]> {
    return this.http.get<TimePeriod[]>(`${this.baseUrl}/periods`);
  }
}
