import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Tools = () => {
  const [logisticsWeight, setLogisticsWeight] = useState('');
  const [logisticsDistance, setLogisticsDistance] = useState('');
  const [logisticsCost, setLogisticsCost] = useState<number | null>(null);
  
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  
  const [docText, setDocText] = useState('');
  const [docLang, setDocLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const calculateLogistics = () => {
    const weight = parseFloat(logisticsWeight);
    const distance = parseFloat(logisticsDistance);
    if (weight && distance) {
      const cost = (weight * 50) + (distance * 30) + 5000;
      setLogisticsCost(cost);
    }
  };

  const convertCurrency = () => {
    const amount = parseFloat(currencyAmount);
    const rates: Record<string, number> = {
      'RUB': 1,
      'USD': 0.011,
      'EUR': 0.010,
      'CNY': 0.078,
      'TRY': 0.35
    };
    if (amount && fromCurrency && toCurrency) {
      const result = amount * (rates[toCurrency] / rates[fromCurrency]);
      setConvertedAmount(result);
    }
  };

  const translateDoc = () => {
    const translations: Record<string, string> = {
      'en': 'Translated to English: ' + docText,
      'ru': 'Переведено на русский: ' + docText,
      'zh': '翻译成中文：' + docText,
      'tr': 'Türkçeye çevrildi: ' + docText
    };
    setTranslatedText(translations[docLang] || docText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Package" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Поставщик.ру</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</Link>
            <Link to="/tenders" className="text-sm font-medium hover:text-primary transition-colors">Тендеры</Link>
            <Link to="/tools" className="text-sm font-medium text-primary">Инструменты</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Вход</Button>
            <Button size="sm">Регистрация</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Инструменты для бизнеса</h2>
          <p className="text-gray-600">Калькуляторы и конвертеры для международной торговли</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name="Truck" size={24} className="text-primary" />
              </div>
              <CardTitle>Калькулятор логистики</CardTitle>
              <CardDescription>Рассчитайте стоимость доставки груза</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Вес груза (кг)</label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={logisticsWeight}
                  onChange={(e) => setLogisticsWeight(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Расстояние (км)</label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={logisticsDistance}
                  onChange={(e) => setLogisticsDistance(e.target.value)}
                />
              </div>
              <Button onClick={calculateLogistics} className="w-full">
                Рассчитать стоимость
              </Button>
              {logisticsCost !== null && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Ориентировочная стоимость доставки:</p>
                  <p className="text-2xl font-bold text-primary">
                    {logisticsCost.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name="DollarSign" size={24} className="text-primary" />
              </div>
              <CardTitle>Конвертер валют</CardTitle>
              <CardDescription>Переведите сумму в нужную валюту</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Сумма</label>
                <Input
                  type="number"
                  placeholder="100000"
                  value={currencyAmount}
                  onChange={(e) => setCurrencyAmount(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Из</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RUB">RUB (₽)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="CNY">CNY (¥)</SelectItem>
                      <SelectItem value="TRY">TRY (₺)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">В</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RUB">RUB (₽)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="CNY">CNY (¥)</SelectItem>
                      <SelectItem value="TRY">TRY (₺)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={convertCurrency} className="w-full">
                Конвертировать
              </Button>
              {convertedAmount !== null && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Результат конвертации:</p>
                  <p className="text-2xl font-bold text-primary">
                    {convertedAmount.toFixed(2)} {toCurrency}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <Icon name="Languages" size={24} className="text-primary" />
              </div>
              <CardTitle>Переводчик документов</CardTitle>
              <CardDescription>Перевод текста контрактов и документов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Текст документа</label>
                <textarea
                  className="w-full min-h-32 p-3 border rounded-md"
                  placeholder="Введите текст для перевода..."
                  value={docText}
                  onChange={(e) => setDocText(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Язык перевода</label>
                <Select value={docLang} onValueChange={setDocLang}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">Английский</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="zh">Китайский</SelectItem>
                    <SelectItem value="tr">Турецкий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={translateDoc} className="w-full">
                Перевести
              </Button>
              {translatedText && (
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Результат перевода:</p>
                  <p className="text-sm">{translatedText}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Tools;
