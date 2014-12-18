;OSC Test
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>

0dbfs = 1
nchnls = 1


chn_k "/3/xy/z", 1
chn_k "/3/xy", 1

gkinput init 0
gkslider init 0
gi_Piano ftgen 80, 0, 2^18, 1, "../audiofiles/Background.wav", 0, 0, 0

	
	ga_Reverb init 0
	ga_DelayOut init 0
	ga_DelayIn init 0

opcode getscale, k, k

	kinput xin
	
	k_index = int(((kinput + 1) / 2) * 40)
	
	k_index = k_index + 40
	
	if(k_index % 12 == 1) then
	
		k_index = k_index - 1
		
	elseif(k_index % 12 == 3) then
	
		k_index = k_index - 1
	
	elseif(k_index % 12 == 4) then
	
		k_index = k_index + 1
		
	elseif(k_index % 12 == 6) then
	
		k_index = k_index + 1
		
	elseif(k_index % 12 == 8) then
	
		k_index = k_index + 1
		
	elseif(k_index % 12 == 10) then
	
		k_index = k_index - 1
		
	elseif(k_index % 12 == 11) then
	
		k_index = k_index + 1
		
	endif
	
	xout k_index
endop

instr 1

	kfreq = cpsmidinn(p4)
	kadsr adsr 0.01, 0.2, 1, 0.5
	aOut1 oscil 0.1 * kadsr, 1/880 * kfreq, gi_Piano
	aOut2 oscil 0.1 * kadsr, 1/440 * kfreq, gi_Piano
	
	aOut = aOut1 + aOut2
	
	   klfo1 lfo 1, 0.1
  klfo2 lfo 1, 0.3



	 afilt1 fofilter aOut, 1000 + (400 * gkslider), 0.007, 0.04
	 afilt2 fofilter aOut, 1000 + (400 * gkslider), 0.007, 0.04

 	
	 afilt balance afilt1 + afilt2, aOut / 7


	ga_DelayIn = (afilt / 2) + ga_DelayIn + (aOut / 8)

	ga_Reverb = afilt / 2 + ga_Reverb +  (aOut / 8)

outs aOut1, aOut2	
endin


instr grainCloud




  asig1 grain 0.5, 4 / 3 / 8, 2, 0, 0, 2, 80, 5, 5
;  asig3 grain 0.5, 1 / 4 * 0.999, 2, 0, 0, 1.4, 80, 5, 5
;  asig4 grain 0.5, 1 / 4 * 0.001, 2, 0, 0, 1.7, 80, 5, 5
; asig = (asig1 + asig3 + asig4) / 3
 asig = asig1

 
; afilt1 fofilter asig, 1000 + (500 * gkslider), 0.007, 0.04
; afilt3 fofilter asig, 7000 + (1000 * gkslider), 0.1, 0.04
; afilt5 fofilter asig, 3000 + (1000 * gkslider), 0.1, 0.1
; afilt7 fofilter asig, 2000 + (1000 * gkslider), 0.1, 0.1
;
;
; afilt = (afilt1  + afilt3  + afilt5  + afilt7)/6
afilt = asig

ga_Reverb = ga_Reverb + afilt + (asig / 2)
ga_DelayIn = ga_Reverb + ga_DelayIn



endin

instr 2

	kcurrentNote init -1
	isliderNotes = 5
			
	if gkinput == 0 then
		turnoff	
	endif
	
	knote getscale gkslider
			
	if kcurrentNote != knote then
	
	event "i", 1, 0, 1, knote
	kcurrentNote = knote
						
	endif
	
	


endin


instr 3

	gkinput chnget "/3/xy/z"
	gkslider chnget "/3/xy"

	ksentinel init 0

	if gkinput != ksentinel then
		
		if gkinput == 1 then
			event "i", 2, 0, -1
		endif
		ksentinel = gkinput
	endif
endin

instr Reverb, 300


aoutL, aoutR freeverb ga_Reverb, ga_Reverb, 1, 0, sr, 0


outs aoutL, aoutR
ga_Reverb = 0
endin

instr Delay, 301

ifeedback = .5

ga_DelayOut delayr .625
delayw ga_DelayIn + (ga_DelayOut * ifeedback)

outs ga_DelayOut, ga_DelayOut

ga_DelayOut = 0
ga_DelayIn = 0

endin


</CsInstruments>
<CsScore>
f5  0 512  20 2                  ; Hanning window

i3 0 10000
i300 0 10000
i301 0 10000
i"grainCloud" 0 10000

;i1 + 0.01
</CsScore>
</CsoundSynthesizer>
