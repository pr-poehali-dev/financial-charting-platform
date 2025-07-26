import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Mock data for Russian stocks
const stockData = {
  VTB: {
    name: 'ВТБ',
    price: 0.0285,
    change: +0.0012,
    changePercent: +4.4,
    data: [
      { time: '09:00', price: 0.0273, open: 0.0270, high: 0.0275, low: 0.0269, close: 0.0273, volume: 1200000 },
      { time: '10:00', price: 0.0276, open: 0.0273, high: 0.0278, low: 0.0272, close: 0.0276, volume: 1350000 },
      { time: '11:00', price: 0.0279, open: 0.0276, high: 0.0281, low: 0.0275, close: 0.0279, volume: 1100000 },
      { time: '12:00', price: 0.0282, open: 0.0279, high: 0.0284, low: 0.0278, close: 0.0282, volume: 980000 },
      { time: '13:00', price: 0.0285, open: 0.0282, high: 0.0287, low: 0.0281, close: 0.0285, volume: 1450000 },
    ]
  },
  ALRS: {
    name: 'Алроса',
    price: 68.5,
    change: -1.2,
    changePercent: -1.7,
    data: [
      { time: '09:00', price: 69.8, open: 70.0, high: 70.2, low: 69.5, close: 69.8, volume: 850000 },
      { time: '10:00', price: 69.3, open: 69.8, high: 69.9, low: 69.1, close: 69.3, volume: 920000 },
      { time: '11:00', price: 68.9, open: 69.3, high: 69.4, low: 68.7, close: 68.9, volume: 1100000 },
      { time: '12:00', price: 68.7, open: 68.9, high: 69.0, low: 68.5, close: 68.7, volume: 750000 },
      { time: '13:00', price: 68.5, open: 68.7, high: 68.8, low: 68.3, close: 68.5, volume: 880000 },
    ]
  },
  CHMF: {
    name: 'Северсталь',
    price: 1247,
    change: +23,
    changePercent: +1.9,
    data: [
      { time: '09:00', price: 1224, open: 1220, high: 1228, low: 1218, close: 1224, volume: 45000 },
      { time: '10:00', price: 1232, open: 1224, high: 1235, low: 1222, close: 1232, volume: 52000 },
      { time: '11:00', price: 1239, open: 1232, high: 1242, low: 1230, close: 1239, volume: 48000 },
      { time: '12:00', price: 1244, open: 1239, high: 1246, low: 1237, close: 1244, volume: 41000 },
      { time: '13:00', price: 1247, open: 1244, high: 1249, low: 1242, close: 1247, volume: 55000 },
    ]
  },
  TCSG: {
    name: 'Тинькофф',
    price: 2856,
    change: +45,
    changePercent: +1.6,
    data: [
      { time: '09:00', price: 2811, open: 2805, high: 2815, low: 2802, close: 2811, volume: 12000 },
      { time: '10:00', price: 2823, open: 2811, high: 2828, low: 2808, close: 2823, volume: 15000 },
      { time: '11:00', price: 2834, open: 2823, high: 2838, low: 2820, close: 2834, volume: 11000 },
      { time: '12:00', price: 2847, open: 2834, high: 2851, low: 2832, close: 2847, volume: 9800 },
      { time: '13:00', price: 2856, open: 2847, high: 2859, low: 2845, close: 2856, volume: 13500 },
    ]
  }
};

const macroData = {
  inflation: 8.3,
  keyRate: 21.0,
  inflationTrend: [
    { month: 'Янв', value: 11.9 },
    { month: 'Фев', value: 11.1 },
    { month: 'Мар', value: 10.7 },
    { month: 'Апр', value: 9.8 },
    { month: 'Май', value: 9.2 },
    { month: 'Июн', value: 8.8 },
    { month: 'Июл', value: 8.3 },
  ]
};

const CandlestickChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
      <XAxis dataKey="time" stroke="#9CA3AF" />
      <YAxis stroke="#9CA3AF" />
      <Tooltip
        contentStyle={{
          backgroundColor: '#1F2937',
          border: '1px solid #374151',
          borderRadius: '8px',
          color: '#F9FAFB'
        }}
      />
      <Area 
        type="monotone" 
        dataKey="close" 
        stroke="#3B82F6" 
        fill="#3B82F6" 
        fillOpacity={0.1}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default function Index() {
  const [selectedStock, setSelectedStock] = useState('VTB');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'candlestick'>('line');

  const currentStock = stockData[selectedStock as keyof typeof stockData];

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentStock.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentStock.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Bar dataKey="volume" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'candlestick':
        return <CandlestickChart data={currentStock.data} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-400">FinanceHub</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Акции</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Портфель</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Аналитика</a>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">Новости</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Bell" size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(stockData).map(([symbol, stock]) => (
            <Card 
              key={symbol} 
              className={`bg-slate-900 border-slate-700 cursor-pointer transition-all hover:border-blue-500 ${
                selectedStock === symbol ? 'border-blue-500 bg-slate-800' : ''
              }`}
              onClick={() => setSelectedStock(symbol)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{stock.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">
                    {stock.price.toLocaleString('ru-RU')}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={stock.change >= 0 ? "default" : "destructive"}
                      className={stock.change >= 0 ? "bg-green-600" : "bg-red-600"}
                    >
                      <Icon name={stock.change >= 0 ? "TrendingUp" : "TrendingDown"} size={12} />
                      {stock.change >= 0 ? '+' : ''}{stock.change}
                    </Badge>
                    <span className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{currentStock.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={chartType === 'line' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setChartType('line')}
                      className={chartType === 'line' ? 'bg-blue-600' : ''}
                    >
                      <Icon name="TrendingUp" size={16} />
                      Линейный
                    </Button>
                    <Button
                      variant={chartType === 'bar' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setChartType('bar')}
                      className={chartType === 'bar' ? 'bg-blue-600' : ''}
                    >
                      <Icon name="BarChart" size={16} />
                      Объемы
                    </Button>
                    <Button
                      variant={chartType === 'candlestick' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setChartType('candlestick')}
                      className={chartType === 'candlestick' ? 'bg-blue-600' : ''}
                    >
                      <Icon name="Candle" fallback="BarChart3" size={16} />
                      Свечи
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderChart()}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Macro Indicators */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Icon name="Globe" size={20} className="mr-2" />
                  Макроэкономика РФ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Инфляция (год)</span>
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                      {macroData.inflation}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Ключевая ставка</span>
                    <Badge variant="outline" className="text-red-400 border-red-400">
                      {macroData.keyRate}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inflation Trend */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg">Динамика инфляции</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={macroData.inflationTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#F59E0B" 
                      fill="#F59E0B" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Market News */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Icon name="Newspaper" size={20} className="mr-2" />
                  Новости рынка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium text-white mb-1">ЦБ сохранил ключевую ставку</div>
                    <div className="text-slate-400 text-xs">2 часа назад</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-white mb-1">Северсталь отчиталась за квартал</div>
                    <div className="text-slate-400 text-xs">4 часа назад</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-white mb-1">ВТБ увеличил дивиденды</div>
                    <div className="text-slate-400 text-xs">6 часов назад</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}